import { Dimmer, Loader } from "semantic-ui-react";


interface Props {
    content?: string;
    isLoading?: boolean
}

const LoadingComponent = ({ content = "App is loading please wait ..", isLoading = false }: Props) => {
    return (
        <Dimmer active={true} inverted={isLoading}>
            <Loader content={content}></Loader>
        </Dimmer>
    )
}


export default LoadingComponent
