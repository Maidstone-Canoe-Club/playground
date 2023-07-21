export async function login (email: string, password: string) : Promise<boolean> {
  const { login } = useDirectusAuth();
  const res = await login({
    email,
    password
  });

  if (res) {
    useState("access-token-expiry").value = Date.now() + res.expires;
    return true;
  }

  return false;
}

export async function logout () {
  const { logout } = useDirectusAuth();
  await logout();
  useState("access-token-expiry").value = 0;
}
