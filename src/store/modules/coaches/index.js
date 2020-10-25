const state = {
    coaches: [
        {
            id: '1',
            firstName: 'Rachmizard',
            lastName: 'Zimmy',
            areas: ['frontend', 'backend', 'system analyst'],
            description: "I'm Rachmizard and I have worked as a employee web developer for years.",
            hourlyRate: 30,
            photoUrl: 'https://media-exp1.licdn.com/dms/image/C5603AQFLmyNtsQ3yow/profile-displayphoto-shrink_200_200/0?e=1609372800&v=beta&t=Or2ovuvrWGWqixuWLkSkzZc4xdTBCvN8bkOpe0h40tk'
        },
        {
            id: '2',
            firstName: 'Ismail',
            lastName: 'Azhafir',
            areas: ['mobile', 'ui/ux'],
            description: "I'm Ismail and I have worked as a freelance mobile developer for years.",
            hourlyRate: 50,
            photoUrl: 'https://media-exp1.licdn.com/dms/image/C5103AQFu08lzt4z3fA/profile-displayphoto-shrink_200_200/0?e=1609372800&v=beta&t=TEpWMXwAuQeGUgp5tu0VWrHMJ6sKv15OFJYNa_nbsos'
        },
        {
            id: '3',
            firstName: 'Alfian',
            lastName: 'Saniputra',
            areas: ['frontend', 'ui/ux'],
            description: "I'm Alfian and I have worked as a freelance mobile developer for years. And also I currently active as a student in UNIKOM.",
            hourlyRate: 50,
            photoUrl: 'https://miro.medium.com/fit/c/160/160/1*OTnZC-TUHlt04kLtWZPoxQ.jpeg'
        }
    ]
}

const mutations = {
    'SET_COACHES'(state, payload) {
        state.coaches = payload
    }
}

const actions = {

}

const getters = {
    getCoaches: (state) => {
        return state.coaches;
    }
}

export default { state, mutations, actions, getters }