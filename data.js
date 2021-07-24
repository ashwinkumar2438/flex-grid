export default {
    flex:{
        type:'flex',
        parent:[
                    {
                        property:'flex-direction',
                        values:['row','column','row-reverse','column-reverse']
                    },
                    {
                        property:'flex-wrap',
                        values:['wrap','nowrap','wrap-reverse']
                    },
                    {
                        property:'justify-content',
                        values:['center','flex-start','flex-end','space-between','space-around','space-evenly']
                    },
                    {
                        property:'align-items',
                        values:['center','flex-start','flex-end','stretch','baseline']
                    },
                    {
                        property:'align-content',
                        values:['center','flex-start','flex-end','space-between','space-around']
                    }
                ],
        children:[
                    {
                        property:'flex-basis',
                        values:['50px','100px','200px','auto','0'],
                    },
                    {
                        property:'flex-grow',
                        values:[0,1,2,3]
                    },
                    {
                        property:'flex-shrink',
                        values:[0,1]
                    },
                    {
                        property:'order',
                        values:[0,1,2,3]
                    },
                    {
                        property:'align-self',
                        values:['auto','center','flex-start','flex-end','stretch','baseline']
                    }

                ],
        parentDefaults:`display:flex;
                        flex-direction:row;
                        flex-wrap:wrap;
                        align-items: center;
                        justify-content: center;
                        align-content:center`,
        getChildDefaults:()=>`flex-basis:200px;
                        flex-grow:0;
                        flex-shrink:0;
                        order:0;
                        align-self:auto;`,

                
    },
    grid:{
        type:'grid',
        parent:[
            {
                property:'grid-template-columns',
                values:['repeat(3, 1fr)']
            },
            {
                property:'grid-template-rows',
                values:['1fr 1fr','1fr 2fr','1fr 3fr']
            },
        ],
        children:[
            {
                property:'grid-column-start',
                values:[1,2,3]
            },
            {
                property:'grid-column-end',
                values:[1,2,3,4]
            }
        ],
        parentDefaults:`display:grid;
                        grid-template-columns:repeat(3, 1fr);
                        grid-template-rows:1fr 1fr;
                        grid-template-areas:'myarea myarea';`,
        getChildDefaults:(i)=>`
                        grid-column-start:${i%3 + 1};
                        grid-column-end:${i%3 + 2};
                        `
    }
}