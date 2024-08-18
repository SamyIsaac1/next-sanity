import { defineConfig } from 'sanity';

import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import schemas from './sanity/schemas';

const config = defineConfig({
  projectId: 'sv0rqnzh',
  dataset: 'production',
  title: 'My Personal Website',
  apiVersion: '2024-08-18',
  basePath: '/admin',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemas },
});
export default config;
