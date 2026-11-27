import React from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "../../ui/Slider";
import { useSettings } from "../../../hooks/useSettings";
import { useOsType } from "../../../hooks/useOsType";

interface ModifierReleaseTimeoutProps {
  descriptionMode?: "tooltip" | "inline";
  grouped?: boolean;
}

/** How long a paste waits for held modifier keys before it fails. */
export const ModifierReleaseTimeout: React.FC<ModifierReleaseTimeoutProps> = ({
  descriptionMode = "tooltip",
  grouped = false,
}) => {
  const { t } = useTranslation();
  const { settings, updateSetting, resetSetting, isUpdating } = useSettings();
  const osType = useOsType();

  // The key check exists on Windows and macOS only.
  if (osType !== "windows" && osType !== "macos") {
    return null;
  }

  const description =
    osType === "macos"
      ? t("settings.debug.modifierReleaseTimeout.descriptionMac")
      : t("settings.debug.modifierReleaseTimeout.description");

  return (
    <Slider
      value={settings?.modifier_release_timeout_secs ?? 30}
      onChange={(value) =>
        updateSetting("modifier_release_timeout_secs", value)
      }
      onReset={() => resetSetting("modifier_release_timeout_secs")}
      isResetting={isUpdating("modifier_release_timeout_secs")}
      min={5}
      max={120}
      step={5}
      label={t("settings.debug.modifierReleaseTimeout.title")}
      description={description}
      descriptionMode={descriptionMode}
      grouped={grouped}
      formatValue={(v) => `${v}s`}
    />
  );
};
