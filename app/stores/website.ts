type webSite = {
  name: string;
  description: string;
}; // specify the return type for fetch
export const useWebsiteStore = defineStore("websiteStore", {
  state: () => ({
    name: "",
    description: "",
  }),
  actions: {
    async fetch() {
      const infos = {
        name: "my",
        description: "Vue this",
      };

      this.name = infos.name;
      this.description = infos.description;
    },
  },
});
