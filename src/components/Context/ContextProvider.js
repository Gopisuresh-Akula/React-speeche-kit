import React, { createContext, useState } from "react";

import { useSpeechRecognition } from "react-speech-kit";

export const Appcontext = createContext();
const ContextProvider = ({ children }) => {
  const [command, setcommand] = useState("");
  const [Listening, setListening] = useState(false);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setcommand(result);
      //   setListening(false);
    },
  });

  return (
    <Appcontext.Provider
      value={{
        setListening,
        setcommand,
        listen,
        stop,
        command,
        Listening,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export default ContextProvider;
