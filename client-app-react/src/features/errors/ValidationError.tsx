import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: string[];
}

const ValidationError = ({ errors }: Props) => {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((error: string, i) => {
                        return <Message.Item key={i}>{error}</Message.Item>;
                    })}
                </Message.List>
            )}
        </Message>
    );
};

export default ValidationError;
