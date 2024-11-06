const requestBody = (answers) => {
    return [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: JSON.stringify(answers),
        },
    ];
};
export default requestBody;
