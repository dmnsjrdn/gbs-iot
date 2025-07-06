import supabase from "./supabase";
import supabaseAdmin from './supabaseAdmin';
import { PAGE_SIZE } from "../utils/constants";

export async function getUsers({ filter, sortBy, page }) {
  let query = supabase
    .from("user_extension")
    .select(
      "id, photo_image, is_active, created_at, username, email",
      { count: "exact" }
    );

  // FILTER
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return { data, count };
}

export async function getUser(id) {
  const { data, error } = await supabase
    .from("user_extension")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("User not found");
  }

  return data;
}

export async function createEditUser(newUser, id) {
  if (!id) {
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email: newUser.email,
      password: import.meta.env.VITE_TEMPORARY_PASSWORD,
    });
    if (signUpError) throw signUpError;

    newUser.id = user.id;
    const { data, error } = await supabase
      .from("user_extension")
      .insert([newUser])
      .select()
      .single();
    if (error) throw new Error("User could not be created");
    return data;
  }

  const { data: updated, error: updateError } = await supabase
    .from("user_extension")
    .update(newUser)
    .eq("id", id)
    .select()
    .single();
  if (updateError) throw new Error("User extension update failed");

  const { error: adminError } = await supabaseAdmin.auth.admin.updateUserById(id, {
    email: newUser.email,
    user_metadata: {
      full_name: newUser.username,
    },
    banned: !newUser.is_active,
  });

  if (adminError) throw new Error("Auth user update failed");

  return updated;
}

export async function deleteUser(id) {
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

  if (authError) {
    console.error("Failed to delete auth user", authError);
    throw new Error("Failed to delete user from auth");
  }

  const { data, error } = await supabase
    .from("user_extension")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete user_extension record", error);
    throw new Error("Failed to delete user from user_extension");
  }

  return data;
}

