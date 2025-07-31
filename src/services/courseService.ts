import { supabase } from "../supabase/supabaseClient";
import type { CreateCourseFormValues} from "../Types/course.types";
import type { Course } from "../Types/course.types";
import type{Chapter}from "../Types/course.types"


//uplodthumbnail function
    export const uploadThumbnail = async (thumbnail: File): Promise<string> => {
  try {
    const fileName = `${Date.now()}_${thumbnail.name}`;
    const { error: uploadError } = await supabase.storage
      .from("course-thumbnails")
      .upload(fileName, thumbnail);

    if (uploadError) {
      throw new Error("Thumbnail upload failed");
    }

    const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/course-thumbnails/${fileName}`;
    return publicUrl;
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    throw error;
  }
};



//insert course function
 export const createCourse = async (
  values: CreateCourseFormValues,
  thumbnailUrl: string,
  createdBy: string
) => {
  try {
    const { data: user, error: userError } = await supabase
      .from("profile")
      .select("is_blocked_as_teacher")
      .eq("id", createdBy)
      .single();

    if (userError || !user) {
      throw new Error("Failed to verify teacher status");
    }

    if (user.is_blocked_as_teacher) {
      throw new Error("Teacher is blocked from creating courses");
    }

    const { data, error } = await supabase
      .from("courses")
      .insert({
        ...values,
        thumbnail_url: thumbnailUrl,
        created_by: createdBy,
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error("Course creation failed");
    }

    return data;
  } catch (err) {
    console.error("createCourse error:", err);
    throw err;
  }
};

// Get courses by teacher
export const getCoursesByTeacher = async (
  teacherId: string
): Promise<Course[]> => {
  try {
    const { data: user, error: userError } = await supabase
      .from("profile")
      .select("is_blocked_as_teacher")
      .eq("id", teacherId)
      
      .single();
      

    if (userError || !user) {
      throw new Error("Failed to verify teacher status");
    }

    if (user.is_blocked_as_teacher) {
      throw new Error("Teacher is blocked from creating courses");
    }

    const { data, error } = await supabase
      .from("courses")
     .select("id, title, description, thumbnail_url,created_by")

      .eq("created_by", teacherId);

    if (error) {
      console.error("Failed to fetch courses", error);
      throw new Error("Could not fetch courses");
    }

    return data as Course[];
  } catch (err) {
    console.error("getCoursesByTeacher error:", err);
    throw err;
  }
};

// getCourseById
export const getCourseById = async (courseId: string): Promise<Course> => {
  try {
    const { data, error } = await supabase
      .from("courses")
   .select("id, title, description, thumbnail_url,created_at, created_by")

      .eq("id", courseId)
     .order("created_at", { ascending: true })

      .single(); // single course milega

    if (error || !data) {
      throw new Error("Failed to fetch course");
    }

    return data;
  } catch (err) {
    console.error("getCourseById error:", err);
    throw err;
  }
};

// get all courses
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from("courses")
     .select("id, title, description, thumbnail_url,created_at,created_by,is_blocked")
       .eq("is_blocked", false)
            .order("created_at", { ascending: true });

    if (error) throw new Error("Failed to fetch all courses");
    return data;
  } catch (err) {
    console.error("getAllCourses error:", err);
    throw err;
  }
};

// upload vedio Function
export const uploadVedio = async (vedio: File): Promise<string> => {
  try {
    const fileName = `${Date.now()}_${vedio.name}`;
    const { error: uploadError } = await supabase.storage
      .from("chapter-videos")
      .upload(fileName, vedio);
    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Failed Upload vedio");
    }
    const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/chapter-videos/${fileName}`;
    return publicUrl;
  } catch (err) {
    console.error("uploadVedio error:", err);
    throw err;
  }
};

// Add chapter Function
export const addChapter = async (chapter: Chapter) => {
  try {
    const { data, error } = await supabase.from("chapter").insert([chapter]);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("addChapter error:", err);
    throw err;
  }
};

// getchapterbyId
export const getChapterById = async (
  chapterId: string
): Promise<Chapter> => {
  try {
    const { data, error } = await supabase
      .from("chapter")
      .select("*")
      .eq("id", chapterId)
     .order("created_at", { ascending: true })

      .single();

    if (error) throw new Error(error.message);
    return data as Chapter;
  } catch (err) {
    console.error("getChapterById error:", err);
    throw err;
  }
};

// getChapterBycourseId
export const getChapterBycourseId = async (courseId: string) => {
  try {
    const { data, error } = await supabase
      .from("chapter")
      .select("*")
      .eq("course_id", courseId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("getChapterBycourseId error:", err);
    throw err;
  }
};

// update chapter
export const updateChapter = async (
  chapterId: string,
  updates: Partial<Chapter>
) => {
  try {
    const { error } = await supabase
      .from("chapter")
      .update(updates)
      .eq("id", chapterId);
    if (error) throw error;
  } catch (err) {
    console.error("updateChapter error:", err);
    throw err;
  }
};

// Delete chapter
export const deleteChapter = async (chapterId: string) => {
  try {
    const { error } = await supabase
      .from("chapter")
      .delete()
      .eq("id", chapterId);
    if (error) throw error;
  } catch (err) {
    console.error("deleteChapter error:", err);
    throw err;
  }
};

// handle ENROLL
export const enrollCourse = async (courseId: string, userId: string) => {
  try {
    const { data: userProfile, error: profileError } = await supabase
      .from("profile")
      .select("is_blocked_as_student")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError.message);
      throw new Error("Could not verify user status.");
    }

    if (userProfile?.is_blocked_as_student) {
      console.warn("Blocked user cannot enroll.");
      throw new Error("You are blocked and cannot enroll in courses.");
    }

    // check already enroll
    const { data: existing } = await supabase
      .from("enrollments")
      .select("id")
      .match({ user_id: userId, course_id: courseId });


    if (existing && existing.length > 0) {
      console.warn("You already enrolled in this course.");
      return;
    }


    // insert enrollment
    const { error } = await supabase.from("enrollments").insert([
      {
        user_id: userId,
        course_id: courseId,
      },
    ]);

    if (error) {
      console.error("Insert error:", error.message);
      throw new Error("Enrollment failed");
    }
  } catch (err) {
    console.error("enrollCourse error:", err);
    throw err;
  }
};

// get enrolled courses
export const getEnrolledCourses = async (
  userId: string
): Promise<Course[]> => {
  try {
    const { data: userProfile, error: profileError } = await supabase
      .from("profile")
      .select("is_blocked_as_student")
      .eq("id", userId)
      .order("created_at", { ascending: true })

      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError.message);
      throw new Error("Could not check user status.");
    }

    if (userProfile?.is_blocked_as_student) {
      console.warn("Blocked user!");
      return [];
    }

    const { data, error } = await supabase
      .from("enrollments")
      .select("courses!enrollments_course_id_fkey(*)")
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase error", error);
      throw new Error("Could not fetch Enrolled courses");
    }

    const coursesOnly = data.map((entry) => entry.courses as unknown as Course);
    return coursesOnly;
  } catch (err) {
    console.error("getEnrolledCourses error:", err);
    throw err;
  }
};

// get course stats
export const getCourseStats = async (teacherId: string) => {
  try {
    const { data: courses, error: courseError } = await supabase
      .from("courses")
      .select("id,title")
      .eq("created_by", teacherId);

    if (courseError) throw courseError;

    const stats = [];
    for (const course of courses) {
      const { count, error: countError } = await supabase
        .from("enrollments")
        .select("id", { count: "exact", head: true })
        .eq("course_id", course.id);

      if (countError) throw countError;

      stats.push({
        course: course.title,
        students: count ?? 0,
      });
    }

    return stats;
  } catch (err) {
    console.error("getCourseStats error:", err);
    throw err;
  }
};

// getUniqueStudents
export const getUniqueStudents = async (teacherId: string) => {
  try {
    const { data: courses, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("created_by", teacherId);

    if (courseError) throw courseError;

    const allStudentIds: string[] = [];

    for (const course of courses) {
      const { data: enrollments, error: enrollmentError } = await supabase
        .from("enrollments")
        .select("user_id")
        .eq("course_id", course.id);

      if (enrollmentError) throw enrollmentError;
      if (enrollments) {
        allStudentIds.push(...enrollments.map((e) => e.user_id));
      }
    }

    const uniqueStudentCount = new Set(allStudentIds).size;
    return uniqueStudentCount;
  } catch (err) {
    console.error("getUniqueStudents error:", err);
    throw err;
  }
};

// MarkChapterWatched
export const markChapterAsWatched = async (
  userId: string,
  chapterId: string
) => {
  try {
    const { data, error } = await supabase.from("watched_chapters").upsert(
      [
        {
          user_id: userId,
          chapter_id: chapterId,
          is_watched: true,
        },
      ],
      { onConflict: "user_id,chapter_id" }
    );
    if (error) throw new Error("Failed to mark chapter as watched");
    return data;
  } catch (err) {
    console.error("markChapterAsWatched error:", err);
    throw err;
  }
};

// get watched chapter
export const getWatchedChapter = async (
  userId: string
): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from("watched_chapters")
      .select("chapter_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching watched chapters:", error.message);
      return [];
    }

    return data.map((item) => item.chapter_id);
  } catch (err) {
    console.error("getWatchedChapter error:", err);
    return [];
  }
};

// get teacher-student summary
export async function getTeacherStudentSummary(teacherId: string) {
  try {
    const { data, error } = await supabase
      .from("teacher_student_enrollments_summary")
      .select("*")
      .eq("teacher_id", teacherId);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("getTeacherStudentSummary error:", err);
    throw err;
  }
};
