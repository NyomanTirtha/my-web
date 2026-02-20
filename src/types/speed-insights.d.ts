// Provide module declaration for direct import from the package's dist
// This avoids compiler errors when importing from the build output path.

declare module '@vercel/speed-insights/dist/index' {
  export * from '@vercel/speed-insights';
}
