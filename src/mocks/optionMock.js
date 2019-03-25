const options = [
    {
        id: 'FLASH_FILL_OPTION',
        action:'PROCESS_SELECT_ID',
        values: [{
            title: 'Aadhar Card',
            image: '',
            value: 'FLASH_FILL_OPTION_AADHAR',
            text: 'I want to use my Aadhar'
        },
        {
            title: 'PAN Card',
            image: '',
            value: 'FLASH_FILL_OPTION_PAN',
            text: 'I want to use my PAN Card'
        },
        {
            title: 'Drivers Card',
            image: '',
            value: 'FLASH_FILL_OPTION_DRIVER',
            text: 'I want to use my Driving Card'
        }]
    },
    {
        id: 'YES_OR_NO',
        action:'PROCESS_YES_NO',
        values: [
            {
                title: 'Yes',
                image: '',
                value: 'YES_OR_NO__YES',
                text: 'Yes'
            },
            {
                title: 'No',
                image: '',
                value: 'YES_OR_NO__NO',
                text: 'No'
            }
        ]

    },
    {
        id: 'FLASH_FILL_METHOD_OPTION',
        action:'PROCESS_CHOOSE_ID',
        values: [
            {
                title: 'Upload a copy',
                image: '',
                value: 'FLASH_FILL_UPLOAD',
                text: 'I want to upload a copy '
            },
            {
                title: 'Scan a document',
                image: '',
                value: 'FLASH_FILL_SCAN',
                text: 'I want to scan the document'
            }
        ]

    }
    
]



export default options;