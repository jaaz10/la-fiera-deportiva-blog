import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  'h2qgkpnm';
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.PUBLIC_SANITY_DATASET ||
  'production';

export default defineConfig({
  name: 'la-fiera-deportiva',
  title: 'La Fiera Deportiva',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
