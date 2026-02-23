import { Show } from "solid-js";
import { createFormControl, createFormGroup } from "solid-forms";

import { Trans, useLingui } from "@lingui-solid/solid/macro";

import { UnicodeEmoji } from "@revolt/markdown/emoji";
import { Column, Dialog, DialogProps, Form2, Text } from "@revolt/ui";

import { useModals } from "..";
import { Modals } from "../types";

/**
 * Modal to pick a new username during onboarding
 */
export function OnboardingModal(
  props: DialogProps & Modals & { type: "onboarding" },
) {
  const { t } = useLingui();
  const { showError } = useModals();

  const group = createFormGroup({
    username: createFormControl("", {
      required: true,
      validators: (value: string) =>
        value.length >= 2 ? null : { minLength: true },
    }),
  });

  async function onSubmit() {
    try {
      await props.callback(group.controls.username.value);
      props.onClose();
    } catch (error) {
      showError(error);
    }
  }

  const submit = Form2.useSubmitHandler(group, onSubmit);

  return (
    <Dialog
      show={props.show}
      onClose={props.onClose}
      title={<Trans>Welcome to HushChat!</Trans>}
      actions={[
        { text: <Trans>Cancel</Trans> },
        {
          text: <Trans>Get started</Trans>,
          onClick: () => {
            onSubmit();
            return false;
          },
          isDisabled: !Form2.canSubmit(group),
        },
      ]}
      isDisabled={group.isPending}
    >
      <form onSubmit={submit}>
        <Column>
          <Text>
            <UnicodeEmoji emoji="👋" />{" "}
            <Trans>
              Pick a username that others will use to find you. You can change
              this later in settings.
            </Trans>
          </Text>
          <Form2.TextField
            name="username"
            control={group.controls.username}
            label={t`Username`}
            autoFocus
          />
          <Show when={group.controls.username.value.length < 2}>
            <Text class="label">
              <Trans>Username must be at least 2 characters.</Trans>
            </Text>
          </Show>
        </Column>
      </form>
    </Dialog>
  );
}
