import { Show, createSignal, onMount } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";

import { useState } from "@revolt/state";
import {
  CategoryButton,
  CategoryButtonGroup,
  CategoryCollapse,
  Checkbox,
  iconSize,
} from "@revolt/ui";

import MdNotifications from "@material-design-icons/svg/outlined/notifications.svg?component-solid";
import MdNotificationsOff from "@material-design-icons/svg/outlined/notifications_off.svg?component-solid";
import MdSpeaker from "@material-design-icons/svg/outlined/speaker.svg?component-solid";

/**
 * Notifications Page
 */
export default function Notifications() {
  const state = useState();

  /**
   * Reactive snapshot of the browser's notification permission.
   * Updated after each permission request and on mount.
   */
  const [permission, setPermission] = createSignal<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "default",
  );

  onMount(() => {
    if (typeof Notification !== "undefined") {
      setPermission(Notification.permission);
    }
  });

  const permissionDenied = () => permission() === "denied";

  /**
   * Handle toggling the desktop notifications setting
   * @param value New checkbox value
   */
  async function onToggleDesktop(value: boolean) {
    if (!value) {
      state.settings.setValue("notifications:desktop", false);
      return;
    }

    // Request permission when enabling
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "denied") {
      // Revert – user blocked notifications at the browser level
      state.settings.setValue("notifications:desktop", false);
    } else {
      state.settings.setValue("notifications:desktop", result === "granted");
    }
  }

  return (
    <CategoryButtonGroup>
      <Show when={permissionDenied()}>
        <CategoryButton
          icon={<MdNotificationsOff {...iconSize(22)} />}
          description={
            <Trans>
              Your browser has blocked notifications. Go to site settings to
              allow them.
            </Trans>
          }
        >
          <Trans>Notifications blocked</Trans>
        </CategoryButton>
      </Show>
      <CategoryButton
        action={
          <Checkbox
            checked={
              !permissionDenied() &&
              !!state.settings.getValue("notifications:desktop")
            }
            disabled={permissionDenied()}
            onChange={onToggleDesktop}
          />
        }
        onClick={() => void 0}
        icon={<MdNotifications {...iconSize(22)} />}
        description={
          <Trans>
            Receive notifications while the app is open and in the background.
          </Trans>
        }
      >
        <Trans>Enable Desktop Notifications</Trans>
      </CategoryButton>
      <CategoryCollapse
        title={<Trans>Sounds</Trans>}
        icon={<MdSpeaker {...iconSize(22)} />}
      >
        <CategoryButton
          action={<Checkbox checked onChange={(value) => void value} />}
          onClick={() => void 0}
          icon="blank"
        >
          <Trans>Message Received</Trans>
        </CategoryButton>
        <CategoryButton
          action={<Checkbox onChange={(value) => void value} />}
          onClick={() => void 0}
          icon="blank"
        >
          <Trans>Message Sent</Trans>
        </CategoryButton>
        <CategoryButton
          action={<Checkbox checked onChange={(value) => void value} />}
          onClick={() => void 0}
          icon="blank"
        >
          <Trans>User Joined Call</Trans>
        </CategoryButton>
        <CategoryButton
          action={<Checkbox checked onChange={(value) => void value} />}
          onClick={() => void 0}
          icon="blank"
        >
          <Trans>User Left Call</Trans>
        </CategoryButton>
      </CategoryCollapse>
    </CategoryButtonGroup>
  );
}
