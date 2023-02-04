/// <reference types="@sveltejs/kit" />

interface Supabase {
  Database: import("./DatabaseDefinitions").Database;
  SchemaName: "public";
}

interface PageData {
  session: import("@supabase/supabase-js").Session | null;
}

declare type AnnotatedVod = {
  id: string;
  videoId: string;
  title: string;
  dateStreamed: string;
  dataRows: VodAnnotation[];
  imageUrl: string;
};

declare type VodAnnotation = {
  id: string;
  sectionStartTime: string;
  sectionEndTime: string;
  sectionDuration: string;
  game: string;
  subject: string;
  description: string;
  timestamp: string;
};

declare namespace Vyneer {
  declare type Vod = {
    id: string;
    title: string;
    starttime: string;
    endtime: string;
    thumbnail: string;
  };
}
