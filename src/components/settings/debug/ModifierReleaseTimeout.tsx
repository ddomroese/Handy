import React from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "../../ui/Slider";
import { useSettings } from "../../../hooks/useSettings";
import { useOsType } from "../../../hooks/useOsType";

interface ModifierReleaseTimeoutProps {
  descriptionMode?: "tooltip" | "inline";
  grouped?: boolean;
}

/**
 * How long Handy waits for held modifier keys to be released before it
 * gives up on a paste that sends keys.
 */
export const ModifierReleaseTimeout: React.FC<ModifierReleaseTimeoutProps> = ({
  descriptionMode = "tooltip",
  grouped = false,
}) => {
  const { t } = useTranslation();
  const { settings, updateSetting, resetSetting, isUpdating } = useSettings();
  const osType = useOsType();

  // Only Windows waits for the keys, so the setting does nothing elsewhere.
  // The description names the Windows keys for the same reason.
  if (osType !== "windows") {
    return null;
  }

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
      description={t("settings.debug.modifierReleaseTimeout.description")}
      descriptionMode={descriptionMode}
      grouped={grouped}
      formatValue={(v) => `${v}s`}
    />
  );
};
