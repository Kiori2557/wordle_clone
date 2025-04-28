const checkAnswer = (guess:string,answer:string,) => {
    const result: string[] = []
    const answerArr = answer.split('')
    const guessArr = guess.split('')

    // First check for correct letters in the correct position
    answerArr.forEach((ans, i) => {
      if (ans === guessArr[i]?.toLowerCase() && guessArr[i] !== "checked") {
        answerArr[i] = "checked";
        guessArr[i] = "checked";
        result[i] = "CORRECT_INDEX";
        }
    });
  // Second check for correct letters in the wrong position
  answerArr.forEach((_, i) => {
    if (answerArr.includes(guessArr[i]) && guessArr[i] !== "checked") {
      const index = answerArr.findIndex((e) => e == guessArr[i])
      console.log(index)
      answerArr[index] = "checked";
      guessArr[i] = "checked";
      result[i] = "CORRECT_LETTER";
    }
  });
  
  // Third check for incorrect letters
  answerArr.forEach((_, i) => {
    if (!answerArr.includes(guessArr[i]) && guessArr[i] !== "checked") {
      guessArr[i] = "checked";
      result[i] = "INCORRECT";
    }
  });
  // Check if the guess is completely correct
  const isCorrect = result.every((cur) => cur === "CORRECT_INDEX");

  return { result, isCorrect };
};

export default checkAnswer;