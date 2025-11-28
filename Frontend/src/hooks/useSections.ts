import { useEffect, useMemo, useState } from "react";
import { CardItem, Section, fetchSections } from "../utils/api";

let sectionsCache: Section[] | null = null;
let pendingPromise: Promise<Section[]> | null = null;

export function useSections() {
  const [sections, setSections] = useState<Section[]>(sectionsCache ?? []);
  const [isLoading, setIsLoading] = useState(!sectionsCache);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (sectionsCache) {
      setIsLoading(false);
      return;
    }
    const load = pendingPromise ?? fetchSections();
    pendingPromise = load;
    load
      .then((data) => {
        if (cancelled) return;
        sectionsCache = data;
        setSections(data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sectionMap = useMemo(() => {
    const map: Record<string, Section> = {};
    sections.forEach((section) => {
      map[section.slug] = section;
    });
    return map;
  }, [sections]);

  const getSectionItems = (slug: string): CardItem[] => sectionMap[slug]?.items ?? [];

  return { sections, isLoading, error, getSectionItems };
}
