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
                    act.date = act.date.split('T')[0];
                    formattedDateActivities.push(act);
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

    handleSelectedActivity = (id: string) => {
        this.selectedActivity = this.activities.find(x => x.id === id);
    }

    handleCancelAcivity = () => {
        this.selectedActivity = undefined;
    }


    handleFormOpen = (id?: string) => {
        if (id) {
            this.handleSelectedActivity(id);

        } else {
            this.handleCancelAcivity();
        }

        this.editMode = true;
    }

    handleFormClose = () => {
        this.editMode = false;
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
                if (this.selectedActivity?.id == id) {
                    this.handleCancelAcivity();
                }
                this.loading = false;
                this.submitting = false;
            })
        } catch (error) {
            console.log(`problem while deleting activity {error}`);
            this.loading = false;
            this.submitting = false;
        }

    }
}
