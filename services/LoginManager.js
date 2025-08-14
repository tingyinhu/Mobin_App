// Demo user database
export const USERDATA = [
  { id: 1, userId: 'a01', first: 'Erica',  last: 'Rangel',   password: 'p01' },
  { id: 2, userId: 'a02', first: 'Kezia',  last: 'Kennedy',  password: 'p02' },
  { id: 3, userId: 'a03', first: 'Riley',  last: 'Wheeler',  password: 'p03' },
];

export function authenticate(authData) {
  // Find the index of the matching user
  const index = USERDATA.findIndex(c => c.userId === authData.username);

  if (index === -1) {
    // No matching username found
    return false;
  }

  if (USERDATA[index].password !== authData.password) {
    // Password mismatch
    return false;
  }

  // Found a match — return full user record (includes password here for demo purposes)
  return USERDATA[index];
}

