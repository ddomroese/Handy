import React from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "../../ui/Slider";
import { useSettings } from "../../../hooks/useSettings";

interface DirectTypingDelayProps {
  descriptionMode?: "tooltip" | "inline";
  grouped?: boolean;
}

export const DirectTypingDelay: React.FC<DirectTypingDelayProps> = ({
  descriptionMode = "tooltip",
  grouped = false,
}) => {
  const { t } = useTranslation();
  const { settings, updateSetting, resetSetting, isUpdating } = useSettings();

  return (
    <Slider
      value={settings?.direct_typing_delay_ms ?? 0}
      onChange={(value) => updateSetting("direct_typing_delay_ms", value)}
      onReset={() => resetSetting("direct_typing_delay_ms")}
      isResetting={isUpdating("direct_typing_delay_ms")}
      min={0}
      max={500}
      step={5}
      label={t("settings.debug.directTypingDelay.title")}
      description={t("settings.debug.directTypingDelay.description")}
      descriptionMode={descriptionMode}
      grouped={grouped}
      formatValue={(v) => `${v}ms`}
    />
  );
};
