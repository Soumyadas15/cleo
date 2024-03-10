"use client";

import { useContext, useRef } from "react";
import RiveAvatar from "@/components/avatarCreator/RiveAvatarComponent";
import RiveIconsContainer from "@/components/avatarCreator/RiveIconsContainer";
import { AvatarStateContext } from "@/app/context/avatarState";
import RiveOptionsContainer from "@/components/avatarCreator/RiveOptionsContainer";
import { JSONData } from "@/app/main/layout";
import { Button } from "../reusable/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";


const uploadPreset = "w3ikumko";

interface RiveMainEntryProps {
  localData: JSONData;
  onClose: () => void;
}

/**
 * Main component for the whole Avatar Builder page
 */
export default function RiveMainEntry({ 
  localData, 
  onClose 
}: RiveMainEntryProps) {

  const {
    state: { activeIcon },
  } = useContext(AvatarStateContext);

  const trimmedActiveIcon: keyof JSONData =
    activeIcon === "BackgroundColor" ? activeIcon : activeIcon.split("Body")[1];


  const avatarRef = useRef(null);
  const router = useRouter();

  const uploadImageToCloudinary = async (imageBlob : any) => {
    const formData = new FormData();
    formData.append('file', imageBlob);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/demiptppx/image/upload', formData);
      console.log('Upload successful. Image URL:', response.data.url);
      await updateProfilePicture(response.data.url);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error("Failed")
    }
  };

  const updateProfilePicture = async (imageUrl : string) => {
    try {
      const response = await axios.put('/api/picture', { imageUrl });
      router.refresh()
      toast.success("Successfully updated")
      onClose();
    } catch (error : any) {
      toast.error(error.message);
    }
  };

  const handleUploadAvatar = () => {
    //@ts-ignore
    const canvas = avatarRef.current?.getElementsByTagName('canvas')[0];
    if (!canvas) {
      console.error('No canvas found inside the Rive component.');
      return;
    }

    canvas.toBlob((blob : any) => {
      if (blob) {
        uploadImageToCloudinary(blob);
      }
    }, 'image/png');
  };


  return (
    <div className="bg-white dark:bg-black rounded-[5px] min-h-[50vh] p-5 md:flex md:flex-row md:justify-center scale-[0.7]">
      <div className="relative w-full h-fit-content flex md:flex-row flex-col md:p-3">
        <div className="h-full w-full md:aspect-square">
          <RiveAvatar ref={avatarRef} />
        </div>
        <div className="w-full h-[50vh] flex flex-col items-end md:h-full relative mx-auto overflow-x-hidden bg-white dark:bg-black p-3 md:p-0 md:pl-3">
          <RiveIconsContainer />
          <RiveOptionsContainer
            buttonCollectionName={trimmedActiveIcon}
            numOptions={localData[trimmedActiveIcon].numOptions}
          />
          <div className="h-[4rem] mt-3 mb-3 flex items-center justify-end w-[60%] gap-6">
            <Button
              label="Cancel"
              outline
              className="text-black dark:text-white p-5 text-[1.5rem] border-black dark:border-black rounded-[5px]" 
              onClick={onClose}
            />
            <Button
              label="Save"
              className="bg-black dark:bg-white text-white dark:text-[#000000] p-5 text-[1.5rem] rounded-[5px]" 
              onClick={handleUploadAvatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
