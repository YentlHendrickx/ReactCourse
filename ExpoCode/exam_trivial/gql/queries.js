import { gql } from "@apollo/client";

export const GET_AGE_GROUPS = gql`
    query GetAgeGroups {
        agegroups {
            id
            ages
            title
        }
    }
`;


export const GET_SUBJECTS_AND_QUESTIONS = gql`
    query GetSubjectsAndAnswers {
        subjects (order_by: {title: asc}) {
            id
            color
            title
            questions {
              id
              answer1
              answer2
              answer3
              question
              correct
            }
        }
    }
`;