export const sessions = {};
export const userModels = {};

export function getSession(user) {
  if (!sessions[user]) {
    sessions[user] = { messages: [], summary: "" };
  }
  return sessions[user];
}

export function getUserModel(user) {
  return userModels[user] || "gpt-oss-120b";
}

export function setUserModel(user, model) {
  userModels[user] = model;
}
