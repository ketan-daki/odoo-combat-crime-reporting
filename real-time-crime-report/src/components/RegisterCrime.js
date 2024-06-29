'use client'

import React, { useEffect, useState, useRef, useCallback } from "react"
import axios from 'axios';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    RadioGroup,
    FormControl,
    FormLabel,
    Radio,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Textarea,
    Select,
    useDisclosure
} from '@chakra-ui/react'


const FileUpload = ({ addFile }) => {
    const [uploadStatus, setUploadStatus] = useState('');

    const convertToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          return reader.result;
        };
        reader.onerror = (error) => {
          console.error('Error converting file to base64:', error);
        };
      };

    const handleFileChange = (event) => {

        try {
            if (addFile) {
                if (event.target?.files?.length < 1) return
                const formData = [];
                for (let i = 0; i < event.target.files.length; i++) {
                    let file = event.target.files[i];
                    formData.push({
                        file:file,
                        fileName: file.name
                    });
                }
                addFile({ media: formData })
            }
        } catch (error) {
            setUploadStatus('Error uploading file.');
        }
    };



    return (
        <div>
            <Input type="file" accept="image/*,video/*,.pdf" onChange={handleFileChange} />
            <p>{uploadStatus}</p>
        </div>
    );
};



function UserProfileEdit({ update }) {

    const [crimeTypes, setCrimeTypes] = useState([
        "Homicide",
        "Assault",
        "Robbery",
        "Rape and Sexual Assault",
        "Burglary",
        "Larceny/Theft",
        "Motor Vehicle Theft",
        "Arson",
        "Fraud",
        "Embezzlement",
        "Money Laundering",
        "Identity Theft",
        "Drug Trafficking",
        "Human Trafficking",
        "Racketeering",
        "Hacking",
        "Phishing",
        "Cyberstalking",
        "Identity Theft",
        "Drug Offenses",
        "Prostitution",
        "Public Intoxication",
        "Disorderly Conduct",
    ]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [crimeDetail, setCrimeDetail] = useState({});
    const [locationType, setLocationType] = useState('select');
    const [registerStatus, setRegisterStatus] = useState('');

    const [isAddLocationFromMap, setIsAddLocationFromMap] = useState(false);

    const fillCrimeDetail = ({ type, lat, lng, time, description, media, location_type }) => {
        if (!type && !lat && !lng && !time && !description && !media) {
            setLocationType(location_type)

            if (location_type === "current") {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            lat = position.coords.latitude;
                            lng = position.coords.longitude;
                        },
                    );
                }
            } else {
                setIsAddLocationFromMap(true)
            }
        }
        const detail = Object.assign({
            type: type || crimeDetail.type,
            lat: lat || crimeDetail.lat,
            lng: lng || crimeDetail.lng,
            time: time || crimeDetail.time,
            description: description || crimeDetail.description,
            media: media || crimeDetail.media
        })
        setCrimeDetail(detail)
    }
    const onClickSubmit = async () => {
        let report_data = {
            type_of_crime: crimeDetail.type,
            datetime: crimeDetail.time,
            lng: crimeDetail.lng,
            lat: crimeDetail.lat,
            description: crimeDetail.description,
            attachment: crimeDetail.media
        }
        try {
            const response = await axios.post("http://localhost:4004/create_crime_report", report_data);
            if (!response.error) {
                setRegisterStatus("Successfully registered");
            } else { 
                setRegisterStatus(response.error);
            }
        } catch (error) {
            setRegisterStatus('Error while registering crime report');
        }
        onClose()

    }
    return (
        <>
            <Button bgGradient="linear(to-r, blue.400,purple.400)" _hover={{
                                bgGradient: "linear(to-r, blue.400,purple.400)",
                               boxShadow: "xl",
                               color:"white"
                             }} color={"white"} onClick={onOpen}>Report Crime</Button>
            {registerStatus}
            <Modal isOpen={isOpen} size={'full'} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Report Crime</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="type" isRequired>
                            <FormLabel>Type of Crime</FormLabel>
                            <Select placeholder='Select type' onChange={(ev) => fillCrimeDetail({ type: ev.target.value })}>
                                {
                                    crimeTypes.map((type) => (<option value={type}>{type}</option>))
                                }
                            </Select>
                        </FormControl>
                        <FormControl id="location" isRequired>
                            <FormLabel>Location</FormLabel>
                            <RadioGroup onChange={(value) => fillCrimeDetail({ location_type: value })} value={locationType}>
                                <Stack direction='row'>
                                    <Radio value='select'>Select on Map</Radio>
                                    <Radio value='current'>Current</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl id="description" isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea placeholder='Add description' onChange={(ev) => fillCrimeDetail({ description: ev.target.value })} />
                        </FormControl>

                        <FormControl id="time">
                            <FormLabel>Time</FormLabel>
                            <Input type="datetime-local" onChange={(ev) => fillCrimeDetail({ time: ev.target.value })} />
                        </FormControl>


                        <FormControl id="media">
                            <FormLabel>Media</FormLabel>
                            <FileUpload addFile={({ media }) => fillCrimeDetail({ media: media })} />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} 
                        bgGradient="linear(to-r, blue.400,purple.400)" onClick={onClose} _hover={{
            bgGradient: "linear(to-r, blue.400,purple.400)",
           boxShadow: "xl",
           color:"white"
         }}>
                            Close
                        </Button>
                        <Button bg={'blue.400'}
                            color={'white'}
                            onClick={onClickSubmit}
                            bgGradient="linear(to-r, blue.400,purple.400)"
                            w="full" _hover={{
                                bgGradient: "linear(to-r, blue.400,purple.400)",
                               boxShadow: "xl",
                               color:"white"
                             }}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function RegisterCrime(props) {

    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                m="10px auto"
                as="form">
                <UserProfileEdit />
            </Box>
        </>
    )
}

export default RegisterCrime