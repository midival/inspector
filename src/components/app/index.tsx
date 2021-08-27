import { IMIDIAccess, MIDIVal } from "@midival/core";
import React, { useEffect, useState } from "react";
import { ConnectedApp } from "../connectedApp";
import { InfoBox } from "../styled/InfoBox";

export const App = () => {

    const [connection, setConnection] = useState<IMIDIAccess>(null);
    const [error, setError] = useState<Error>(null);

    useEffect(() => {
        MIDIVal.connect()
        .then(setConnection)
        .catch(setError);
    }, []);

    if (error) {
        return <h2>{error.message}</h2>
    }

    if (!connection) {
        return <InfoBox>Connecting</InfoBox>;
    } else {
        return (<ConnectedApp connection={connection} />);
    }
}