export default [
  [],
  [
    {
      id: "age",
      name: "Age",
      type: "number",
    },
    {
      id: "marital_status",
      name: "Marital Status",
      dropdown: [{"value": 1, "option": "Married"}, {"value": 2, "option": "Widowed"}, {"value": 3, "option": "Divorced"}, {"value": 4, "option": "Separated"}, {"value": 5, "option": "Never Married"}],
    },
    {
      "id": "sex",
      "name": "Sex",
      "dropdown": [{
        "value": 1,
        "option": "Male",
      }, {
        "value": 2,
        "option": "Female",
      }],
    }, {
      "id": "number_of_kids",
      "name": "Number of Kids",
      "type": "number",
    }, {
      "id": "major",
      "name": "Major",
      "dropdown": [{
        "value": 0,
        "option": "Marketing",
      }, {
        "value": 1,
        "option": "Computer Science",
      }, {
        "value": 2,
        "option": "Electrical and Electronic Engineering",
      }, {
        "value": 3,
        "option": "Surface Science",
      }, {
        "value": 4,
        "option": "Complex Systems Modelling",
      }, {
        "value": 5,
        "option": "Finance",
      }, {
        "value": 6,
        "option": "International Economics and Trade",
      }, {
        "value": 7,
        "option": "Information Management",
      }, {
        "value": 8,
        "option": "Biology",
      }],
    }, {
      "id": "house_tenure",
      "name": "House Tenure",
      "dropdown": [{
        "value": 1,
        "option": "Owned with mortgage",
      }, {
        "value": 2,
        "option": "Owned without mortgage",
      }, {
        "value": 4,
        "option": "Rented",
      }, {
        "value": 5,
        "option": "Occupied without payment of cash rent",
      }, {
        "value": 6,
        "option": "Student housing",
      }],
    }, {
      "id": "occupation",
      "name": "Occupation",
      "dropdown": [{
        "value": 1,
        "option": "Administrator, manager",
      }, {
        "value": 2,
        "option": "Teacher",
      }, {
        "value": 3,
        "option": "Professional",
      }, {
        "value": 4,
        "option": "Administrative support, including clerical",
      }, {
        "value": 5,
        "option": "Sales, retail",
      }, {
        "value": 6,
        "option": "Sales, business goods and services",
      }, {
        "value": 7,
        "option": "Technician",
      }, {
        "value": 8,
        "option": "Protective service",
      }, {
        "value": 9,
        "option": "Private household service",
      }, {
        "value": 10,
        "option": "Other service",
      }, {
        "value": 11,
        "option": "Machine operator, assembler, inspector",
      }, {
        "value": 12,
        "option": "Transportation operator",
      }, {
        "value": 13,
        "option": "Handler, helper, laborer",
      }, {
        "value": 14,
        "option": "Mechanic, repairer, precision production",
      }, {
        "value": 15,
        "option": "Construction, mining",
      }],
    }, {
      "id": "income_past12months",
      "name": "Income of Past Year",
      "type": "number",
    }, {
      "id": "education_level",
      "name": "Education Level",
      "dropdown": [{
        "value": 0,
        "option": "Never attended school",
      }, {
        "value": 10,
        "option": "First through eighth grade",
      }, {
        "value": 11,
        "option": "Ninth through twelfth grade (no H.S. diploma)",
      }, {
        "value": 12,
        "option": "High school graduate",
      }, {
        "value": 13,
        "option": "Some college, less than college graduate",
      }, {
        "value": 14,
        "option": "Associate's degree (occupational/vocational or academic)",
      }, {
        "value": 15,
        "option": "Bachelor's degree",
      }, {
        "value": 16,
        "option": "Master's degree, (professional/Doctorate degree)*",
      }],
    },
  ],
  [
    {
      id: "credit_card_charge_percentage",
      name: "Credit Card Charge %",
      type: "number",
    },
    {
      id: "shares_offering",
      name: "Shares Offering",
      type: "number",
    },
    {
      id: "market_lot",
      name: "Market Lot",
      type: "number",
    },
    {
      id: "minimum_order_quantity",
      name: "Minimum Order Quantity",
      type: "number",
    },
  ],
];
