import api from './api';

export async function getEvents(userID) {
  console.log(userID);
  try {
    const events = await api.get('/getevents', {
      params: {
        userID,
      },
    });
    console.log(events.data);
    return events.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserFullName(userID) {
  try {
    const fullName = await api.get('/getuserfullname', {
      params: {
        userID,
      },
    });
    console.log(fullName.data);
    return fullName.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserExpenses(userID, eventID) {
  try {
    const expenses = await api.get('/getuserexpenses', {
      params: {
        userID,
        eventID,
      },
    });
    console.log(expenses.data);
    return expenses.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getEventDetails(eventID) {
  try {
    const details = await api.get('/geteventdetails', {
      params: {
        eventID,
      },
    });
    return details.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getInvitedUsers(eventID) {
  try {
    const invitedUsers = await api.get('/getinvitedusers', {
      params: {
        eventID,
      },
    });
    return invitedUsers.data;
  } catch (err) {
    console.error(err);
  }
}

export async function loginAuth(username, password) {
  try {
    const loginStatus = await api.get('/loginauth', {
      params: {
        username,
        password,
      },
    });
    return loginStatus.data;
  } catch (err) {
    console.error(err);
  }
}
