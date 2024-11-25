import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activities: Activity[] = []
    selectedActivity: Activity | undefined = undefined
    editMode: boolean = false
    loading: boolean = false
    submitting: boolean = false

    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();

            /*runInAction = It is used to batch multiple state updates together in a single action,
             ensuring that all updates are treated as part of a single transaction. */


            runInAction(() => {
                this.loading = true;
                let formattedDateActivities: Activity[] = [];
                activities.forEach(act => {
                    formattedDateActivities.push(this.setActivityDate(act));
                });

                this.activities = formattedDateActivities
                this.loading = false;
            })

        } catch (error) {
            runInAction(() => {
                this.loading = false;
                console.log(error);
            })
        }
    }

    loadSingleActivity = async (id: string) => {
        let activity = this.activities.find(a => a.id === id);

        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loading = true;
            if (this.activities.length === 0) {
                await this.loadActivities();
            }

            activity = this.activities.find(a => a.id === id);

            if (activity) {
                this.selectedActivity = activity;
                this.loading = false;
                return activity;
            } else {
                try {
                    activity = await agent.Activities.details(id);
                    runInAction(() => {
                        this.setActivityDate(activity!);
                        this.selectedActivity = activity;
                        this.loading = false;
                    });
                    return activity;
                } catch (error) {
                    runInAction(() => {
                        this.loading = false;
                        console.error(error);
                    });
                }
            }
        }
    };



    private setActivityDate = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        return activity;
    }


    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);

            runInAction(() => {
                this.activities.push(activity);
                this.editMode = false;
                this.selectedActivity = activity;
                this.submitting = false;
                this.loading = false;
            })
        }
        catch (e) {
            console.log(`problem while creating activity {e}`);

            runInAction(() => {
                this.editMode = false;
                this.submitting = false;
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        await agent.Activities.update(activity);
        try {
            runInAction(() => {
                //this.activities = [];
                this.activities = ([...this.activities.filter(x => x.id !== activity.id), activity]);
                this.editMode = false;
                this.selectedActivity = activity;
                this.submitting = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(`problem while Updqating activity {error}`);
            this.loading = false;
            this.submitting = false;
        }
    }


    handleDeleteActivity = async (id: string) => {
        this.loading = true;
        this.submitting = true;
        await agent.Activities.delete(id);

        try {
            runInAction(() => {
                this.activities = ([...this.activities.filter(x => x.id !== id)]);
                this.loading = false;
                this.submitting = false;
            })
        } catch (error) {
            console.log(`problem while deleting activity {error}`);
            this.loading = false;
            this.submitting = false;
        }

    }


    get GroupedActivities() {
        const groupedActivities = new Map<string, Activity[]>();

        this.activities.forEach(activity => {
            const dateKey = activity.date;
            if (!groupedActivities.has(dateKey)) {
                groupedActivities.set(dateKey, []);
            }
            groupedActivities.get(dateKey)!.push(activity);
        });


        // Declare a constant variable `result` with a specific type.
        // The type is an array of objects, where:
        // 1. Each object has:
        //    - A `date` property of type `string`.
        //    - An `activities` property, which is an array of `Activity` objects.
        // 2. The `[]` after the object type indicates that `result` is an array of these objects.
        // 3. The `= []` initializes `result` as an empty array.
        const result: { date: string; activities: Activity[] }[] = [];

        for (const [date, activities] of groupedActivities) {
            result.push({ date, activities });
        }

        return result;
    }

}
