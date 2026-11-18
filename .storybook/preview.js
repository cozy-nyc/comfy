import "../css/cozy.css";
import "../css/cozy-components.css";
import "./preview.css";

/** Dark is cozy's default; `data-theme="light"` on the root opts into light. */
export const globalTypes = {
  theme: {
    description: "cozy theme",
    toolbar: {
      title: "Theme",
      icon: "paintbrush",
      items: [
        { value: "dark", title: "Dark (default)" },
        { value: "light", title: "Light" },
      ],
      dynamicTitle: true,
    },
  },
};

export const initialGlobals = { theme: "dark" };

export const decorators = [
  (story, context) => {
    const root = document.documentElement;
    if (context.globals.theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    return story();
  },
];

export const parameters = {
  layout: "fullscreen",
  controls: { expanded: true },
  options: {
    storySort: { order: ["Overview", "Foundations", "Components"] },
  },
};
