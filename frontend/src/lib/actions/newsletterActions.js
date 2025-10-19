export async function newsletterAction({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  // send to backend newsletter server ...
  return { status: "success", email };
}
