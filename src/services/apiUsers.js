import supabase from "./supabase";
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
    // Optional: Create user in auth (auto-confirm)
    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email: newUser.email,
      password: import.meta.env.VITE_TEMPORARY_PASSWORD,
    });
    if (authError) throw authError;

    // const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    //   user_metadata: {
    //     full_name: newUser.username,
    //   },
    // });
    // if (updateError) throw updateError;

    newUser.id = user.id;
    const { data, error } = await supabase
      .from("user_extension")
      .insert([newUser])
      .select()
      .single();
    if (error) throw new Error("User could not be created");
    return data;
  }

  const { data, error } = await supabase
    .from("user_extension")
    .update(newUser)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error("User could not be updated");
  return data;
}

// export async function createUser(obj) {
//   const { user, error: signUpError } = await supabase.auth.signUp({
//     email,
//     password
//   });

//   if (user) {
//     await supabase.from('user_extension').insert({
//       id: user.id,
//       username,
//       email,
//       photo_image,
//       is_active: true
//     });
//   }

//   if (error) {
//     console.error(error);
//     throw new Error("User could not be created");
//   }
// }

// export async function updateUser(id, obj) {
//   const { data, error } = await supabase
//     .from("user_extension")
//     .update(obj)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("User could not be updated");
//   }
//   return data;
// }

export async function deleteUser(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("user_extension").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("User could not be deleted");
  }
  return data;
}
