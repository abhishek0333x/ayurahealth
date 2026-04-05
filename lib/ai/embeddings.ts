import { pipeline } from '@xenova/transformers';

let extractor: Awaited<ReturnType<typeof pipeline>> | null = null;

/**
 * Initializes the embedding extractor (all-MiniLM-L6-v2, 384 dimensions)
 * This runs locally and does not require an API key.
 */
async function getExtractor() {
  if (!extractor) {
    extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return extractor;
}

/**
 * Generates a vector embedding for a given text.
 * @param text The string to embed.
 * @returns An array of 384 floats representing the embedding.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const extract = await getExtractor();
    const output = await extract(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
}

/**
 * Format a number array as a PostgreSQL-compatible vector string.
 * @param embedding Array of numbers.
 * @returns String in the format "[0.1, 0.2, ...]"
 */
export function formatVector(embedding: number[]): string {
  return `[${embedding.join(',')}]`;
}
