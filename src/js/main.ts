import spotifyListening from "./spotifyListening.ts";

type LambdaPayload =
  | string
  | {
    message?: string;
    content?: string;
    text?: string;
  };

async function hydrateLambdaWidgets() {
  const widgets = document.querySelectorAll<HTMLElement>("[data-lambda-widget]");

  await Promise.all(
    [...widgets].map(async (widget) => {
      const endpoint = widget.dataset.endpoint;
      const fallback = widget.dataset.fallback ?? "This live module is unavailable.";
      const statusNode = widget.querySelector<HTMLElement>("[data-lambda-status]");

      if (!endpoint || !statusNode) {
        return;
      }

      try {
        const response = await fetch(endpoint, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json() as LambdaPayload;

        if (typeof payload === "string") {
          statusNode.textContent = payload;
          return;
        }

        statusNode.textContent = payload.message ?? payload.content ?? payload.text ?? fallback;
      } catch (_error) {
        statusNode.textContent = fallback;
        widget.dataset.state = "error";
      }
    }),
  );
}

void hydrateLambdaWidgets();
void spotifyListening();
