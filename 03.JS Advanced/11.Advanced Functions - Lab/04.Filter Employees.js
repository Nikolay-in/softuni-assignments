function filterEmployees(input, criterias) {
    input = JSON.parse(input);
    let [criteria, criteriaValue] = criterias.split('-');
    input = input.filter(e => e[criteria] == criteriaValue);
    for (let i = 0; i < input.length; i++) {
        console.log(`${i}. ${input[i].first_name} ${input[i].last_name} - ${input[i].email}`);
    }
}

filterEmployees(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`, 
'gender-Female'
);