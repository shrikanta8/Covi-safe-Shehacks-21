function updateMap1()
{
    fetch("mapdata.json")
    .then(response => response.json())
    .then(rsp => {
        console.log(rsp.data)
        rsp.data.forEach(element=>{
            latitude=element.Lat;
            longitude=element.Long;

            cases= element.confirmed;

            if(cases>1000000)
            {
                color="rgb(0,0, 255)";
            }
            else 
            {
                color=`rgb(0,0,${cases/1000})`;
            }
            popup=new mapboxgl.Popup({offset:50}).setText('Cases: '+cases);
            new mapboxgl.Marker({
                color: color,
                draggable: false
                }).setLngLat([longitude, latitude])
                .setPopup(popup)
                .addTo(map);
        });
    })
}
function updateMap2()
{
    fetch("mapdata.json")
    .then(response => response.json())
    .then(rsp => {
        console.log(rsp.data)
        rsp.data.forEach(element=>{
            latitude=element.Lat;
            longitude=element.Long;

            deaths =element.deaths;

            if(deaths>100000)
            {
                color="rgb(255, 0, 0)";
            }
            else 
            {
                color=`rgb(${deaths/100},0, 0)`;
            }
            popup=new mapboxgl.Popup({offset:50}).setText('Deaths: '+ deaths);
            new mapboxgl.Marker({
                color: color,
                draggable: false
                }).setLngLat([longitude, latitude])
                .setPopup(popup)
                .addTo(map);
        });
    })
}