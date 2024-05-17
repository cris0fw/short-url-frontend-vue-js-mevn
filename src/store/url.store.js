import { defineStore } from "pinia";
import { api } from "../config/axios";
import { useCounterStore } from "./user.store";
import { ref } from "vue";
import axios from "axios";

export const useLinkStore = defineStore("link", () => {
  const userStore = useCounterStore();
  const links = ref([]);

  const createLink = async (longLink) => {
    try {
      const res = await api.post(
        "links/create-links",
        {
          longLink,
        },
        {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      if (error.response) {
        if (Array.isArray(error)) {
          error.map((err) => {
            return toast.error(err.msg);
          });
        } else {
          toast.error(error.message);
        }
      }
    }
  };

  const getLinks = async () => {
    try {
      const res = await api.get("links/all-links", {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });

      links.value = [...res.data];
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLinks = async (id) => {
    try {
      await api.delete(`links/remove-links/${id}`, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });

      links.value = links.value.filter((item) => item._id !== id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLinks = async (newLink) => {
    await api.patch(
      `links/update-links/${newLink.id}`,
      {
        longLink: newLink.longLink,
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      }
    );

    links.value = links.value.map((item) => {
      item._id === newLink._id ? newLink : item;
    });
  };

  const singleLink = async (nanoLink) => {
    try {
      const res = await api.get(`links/single-links/${nanoLink}`);
      return res.data.longLink;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createLink,
    getLinks,
    links,
    deleteLinks,
    updateLinks,
    singleLink,
  };
});
