import { atom } from 'recoil';

export const nameState = atom({
    key: "nameState",
    default: "",
});

export const ageGroupState = atom({
    key: "ageGroupState",
    default: {id: 1, groupString: "Young Adults (18 - 29)"}
});

export const chosenSubjectState = atom({
    key: "chosenSubjectState",
    default: 1
});

export const correctAnswers = atom({
    key: "correctAnswers",
    default: []
});