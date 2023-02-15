const express = require('express');
const router = express.Router();

router.get('/activities', (req, res) => {
  try {
    // Suponiendo que las actividades no esten hardcodeadas, el proceso debe estar en un try/catch por si surge algun error
    let activities = [
      {
        activityId: 1,
        title: "Cerro catedral",
        type: "ACTIVITY",
        startDate: "2022-01-21 01:30:00",
        endDate: "2022-01-21 23:30:00",
        status: "IN_PROGRESS",
      },
      {
        activityId: 2,
        title: "Fiesta de espuma",
        type: "PARTY",
        startDate: "2022-01-22 01:30:00",
        endDate: "2022-01-22 23:30:00",
        status: "DONE",
      },
      {
        activityId: 3,
        title: "Desayuno",
        type: "FOOD",
        startDate: null,
        endDate: null,
        status: null,
      },
      {
        activityId: 4,
        title: "Fiesta de blanco",
        type: "PARTY",
        startDate: "2022-01-20 01:30:00",
        endDate: "2022-01-20 23:30:00",
        status: "IN_PROGRESS",
      },
      {
        activityId: 5,
        title: "Escalada",
        type: "ACTIVITY",
        startDate: "2022-01-22 01:30:00",
        endDate: "2022-01-22 23:30:00",
        status: "DONE",
      },
    ]
    res.status(200).send(activities);
  } catch (error) {
    res.status(404).send("No se encontraron las actividades")
  }
});

module.exports = router;