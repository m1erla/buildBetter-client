import api from "../utils/api";
import { toast } from "react-toastify";

export const DEFAULT_AD_IMAGE = "/images/placeholder-ad.png";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAllAds = async () => {
  try {
    const response = await api.get("/api/v1/ads");
    const adsWithImages = (response.data || []).map(ad => ({
      ...ad,
      images: ad.images && ad.images.length > 0
        ? ad.images
        : [{ url: DEFAULT_AD_IMAGE, name: "default-ad.png", id: `default-img-${ad.id}` }],
    }));
    return adsWithImages;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const getAdById = async (adId) => {
  try {
    const response = await api.get(`/api/v1/ads/${adId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      const notFoundError = new Error("İlan bulunamadı.");
      notFoundError.response = { status: 404, data: { message: "İlan bulunamadı." } };
      handleApiError(notFoundError);
    } else {
      handleApiError(error);
    }
    throw error;
  }
};

const getAdsByUserId = async (userId) => {
  try {
    const response = await api.get(`/api/v1/ads/user/${userId}`, {
      headers: getAuthHeader(),
    });
    const adsWithImages = (response.data || []).map(ad => ({
      ...ad,
      images: ad.images && ad.images.length > 0
        ? ad.images
        : [{ url: DEFAULT_AD_IMAGE, name: "default-ad.png", id: `default-img-${ad.id}` }],
    }));
    return adsWithImages;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const getAdImages = async (adId) => {
  try {
    const response = await api.get(`/api/v1/ads/${adId}/images`);
    const images = response.data || [];

    if (images.length === 0) {
      return [{ url: DEFAULT_AD_IMAGE, name: "default.png", id: `default-img-${adId}` }];
    }

    return images;
  } catch (error) {
    console.warn(`Failed to load ad images for ${adId}:`, error);
    return [{ url: DEFAULT_AD_IMAGE, name: "default.png", id: `default-img-${adId}` }];
  }
};

const createAd = async (formData) => {
  try {
    const response = await api.post("/api/v1/ads/create", formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201 || response.status === 200) {
      toast.success("İlan başarıyla oluşturuldu!");
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const updateAd = async (id, formData) => {
  try {
    const response = await api.put(`/api/v1/ads/update/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      toast.success("İlan başarıyla güncellendi!");
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const deleteAd = async (adId) => {
  try {
    const response = await api.delete(`/api/v1/ads/${adId}`, {
      headers: getAuthHeader(),
    });

    if (response.status === 200 || response.status === 204) {
      toast.success("İlan başarıyla silindi!");
      return true;
    }
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const toggleAdStatus = async (adId) => {
  try {
    const response = await api.patch(`/api/v1/ads/${adId}/toggle-status`, null, {
      headers: getAuthHeader(),
    });

    if (response.status === 200) {
      toast.success("İlan durumu güncellendi!");
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    toast.error("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.");
  } else if (error.response?.status === 403) {
    toast.error("Bu işlem için yetkiniz bulunmamaktadır.");
  } else if (error.response?.status === 404) {
    toast.error(error.response?.data?.message || "Kaynak bulunamadı.");
  } else {
    toast.error(
      error.response?.data?.message || error.message || "Bir hata oluştu."
    );
  }
};

const adService = {
  getAllAds,
  getAdsByUserId,
  getAdById,
  getAdImages,
  createAd,
  updateAd,
  deleteAd,
  toggleAdStatus,
  getAuthHeader,
};

export default adService;
