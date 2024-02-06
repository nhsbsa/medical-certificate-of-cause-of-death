const patientsData = [
  {
    "id": "0001",
    "name": "Aaliyah Farah Abbas",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0002",
    "name": "Adrian Dickson",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community<br>ME cert",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0003",
    "name": "Amelia Brown",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0004",
    "name": "Andrea Bartlett",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0005",
    "name": "Andrea Bishop",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0006",
    "name": "Angel Hewitt",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0007",
    "name": "Armaan Chang",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0008",
    "name": "Brogan Hali Bowers",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0009",
    "name": "Caleb Greenaway",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0010",
    "name": "Charley Angeli Frost",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0011",
    "name": "Charlie Endo Tran",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0012",
    "name": "Cian Yates",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0013",
    "name": "Darcey Rowe",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0014",
    "name": "Devon Barlow",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0015",
    "name": "Dillan Jhorrad Khan",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0016",
    "name": "Dillon Norman",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0017",
    "name": "Ebony Austin",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0018",
    "name": "Elena Domenica Hunt",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0019",
    "name": "Erik Hendin",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0020",
    "name": "Erin Potts",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0021",
    "name": "Faith Wiggins",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0022",
    "name": "Felix Ashley Ware",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0023",
    "name": "Harris Bowman",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0024",
    "name": "Idris Felba",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0025",
    "name": "Jenna Kirk",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0026",
    "name": "Jerry Sherman",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0027",
    "name": "Jordan Carrillo",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0028",
    "name": "Joseph William Doyle",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0029",
    "name": "Jude Perry",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0030",
    "name": "Julia Graham",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0031",
    "name": "Kaya Hoffman",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0032",
    "name": "Kia Ravi",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0033",
    "name": "Kristen Chandler",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0034",
    "name": "Kyan Mcguire",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0035",
    "name": "Lachlan Rosario",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0036",
    "name": "Laurie Boyd",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0037",
    "name": "Lea Donna Durham",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0038",
    "name": "Louie O'Quinn",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0039",
    "name": "Mackenzie Howard",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0040",
    "name": "Maddison Juarez",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0041",
    "name": "Mae Alexander",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0042",
    "name": "Malik Sloan",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0043",
    "name": "Marissa Guerrero",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0044",
    "name": "Marley Myers",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0045",
    "name": "Mika Low",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0046",
    "name": "Milo Brett",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0047",
    "name": "Mina Wu",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0048",
    "name": "Minato Semaj",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0049",
    "name": "Molly Knowles",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0050",
    "name": "Myra Jari Adkins",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0051",
    "name": "Nana Bullock",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0052",
    "name": "Pearl Small",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0053",
    "name": "Riley James",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0054",
    "name": "Rory Vaughn",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0055",
    "name": "Sasha Castro",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0056",
    "name": "Shannon Ferrell",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0057",
    "name": "Sienna Mcdonald",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },
  {
    "id": "0058",
    "name": "Taylor Marshall",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  },

  {
    "id": "0059",
    "name": "Verity Duncann",
    "nhsNo": "NHS no.: 321 654 987",
    "placeOfDeath": "Community",
    "dateOfDeath": "31 January 2024",
    "actions": ["Review", "View", "Share"],
    "statuses": ["Ready for MEO review", "To be amended", "Ready for ME sign off", "Ready to share", "On hold for coroner", "On hold"]
  }
]

function patientTemplate(patient) {
  return `
  <tr class="govuk-table__row">
    <td class="govuk-table__cell">${patient.name}
    <br><span class="govuk-body-s govuk">${patient.nhsNo}</span></td>
    <td class="govuk-table__cell">${patient.placeOfDeath}</td>
    <td class="govuk-table__cell">${patient.dateOfDeath}</td>
    <td class="govuk-table__cell">
      <a href="meo-mccd-summary?id=${patient.id}" class="govuk-link">${patient.actions}</a>
    </td>
    <td class="govuk-table__cell govuk-table__cell--numeric"><strong class="govuk-tag govuk-tag--blue">${patient.statuses[0]}</strong></td>
  </tr>`
}

document.getElementById("data-output").innerHTML = `
${patientsData.slice(0,10).map(patientTemplate).join('')}
`

