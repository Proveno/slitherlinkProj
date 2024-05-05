export async function tokenInfo() {
  const resPlayer = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/token`, {
    method: "POST",
  });
  const { playerData } = await resPlayer.json();
  return playerData;
}
