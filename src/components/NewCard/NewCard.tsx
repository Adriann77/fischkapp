import React from "react";
import { useState } from "react";
import { NewCardFirstStep } from "./NewCardFirstStep";
import { NewCardSecondStep } from "./NewCardSecondStep";

interface Props {
  checker: boolean;
  reset: () => void;
  onSaveClick: (heading: string, answer: string) => void;
}

export const NewCard = ({ checker, reset, onSaveClick }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [textInputValue, setTextInputValue] = useState("");
  const [secondStep, setSecondStep] = useState(false);
  const [showError, setShowError] = useState(false);
  const [firstStep, setFirstStep] = useState(checker);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextInputValue(event.target.value);
  };

  const backToFirstStep = () => {
    setFirstStep(true);
    setSecondStep(false);
    setShowError(false);
  };
  const checkInput = () => {
    if (inputValue.length === 0) {
      setShowError(true);
    } else {
      setShowError(false);
      setFirstStep(false);
      setSecondStep(true);
    }
  };

  const checkTextInput = () => {
    if (textInputValue.length === 0) {
      setShowError(true);
    } else {
      setShowError(false);
      setFirstStep(false);
      setSecondStep(false);
      reset();

    const front = inputValue;
	const back = textInputValue;
		

      onSaveClick(front, back);
    }
  };

  return (
    <>
      {firstStep && (
        <NewCardFirstStep
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          reset={reset}
          showError={showError}
          checkInput={checkInput}
        />
      )}
      {secondStep && (
        <NewCardSecondStep
          inputValue={inputValue}
          textInputValue={textInputValue}
          handleTextInputChange={handleTextInputChange}
          showError={showError}
          backToFirstStep={backToFirstStep}
          checkTextInput={checkTextInput}
          reset={reset}
        />
      )}
    </>
  );
};
