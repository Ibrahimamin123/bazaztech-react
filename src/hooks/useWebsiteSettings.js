import { useEffect, useState } from "react";
import { getPublicSettings } from "../services/publicApi";

let cachedSettings = null;
let cachePromise = null;

export const useWebsiteSettings = () => {
  const [settings, setSettings] = useState(cachedSettings);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings);
      setLoading(false);
      return;
    }

    if (!cachePromise) {
      cachePromise = getPublicSettings()
        .then((res) => {
          cachedSettings = res.data.settings || null;
          return cachedSettings;
        })
        .catch(() => null);
    }

    cachePromise.then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  return {
    settings,
    loading,
    whatsapp: settings?.whatsapp || "",
    founderVideoUrl: settings?.founderVideoUrl || "",
    youtubeChannelUrl: settings?.youtubeChannelUrl || "",
  };
};

export const clearSettingsCache = () => {
  cachedSettings = null;
  cachePromise = null;
};
