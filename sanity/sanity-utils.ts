import { createClient, groq, type QueryParams } from 'next-sanity';
import { Project } from '@/types/Project';
import clientConfig from './config/client-config';
import { Page } from '@/types/Page';

export const client = createClient(clientConfig);

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 10, // default revalidation time in seconds
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}

export async function getProjects(): Promise<Project[]> {
  return sanityFetch({
    query: groq`*[_type == "project"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`,
  });
}

export async function getProject(slug: string): Promise<Project> {
  return sanityFetch({
    query: groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`,
    params: { slug },
  });
}

export async function getPages(): Promise<Page[]> {
  return sanityFetch({
    query: groq`*[_type == "page"]{
      _id,
      _createdAt,
      title,
      "slug": slug.current
    }`,
  });
}

export async function getPage(slug: string): Promise<Page> {
  return sanityFetch({
    query: groq`*[_type == "page" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      content
    }`,
    params: { slug },
  });
}
