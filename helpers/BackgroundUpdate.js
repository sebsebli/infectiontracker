// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import axios from 'axios';
export default function getUpdates() {
    TaskManager.defineTask("UpdateContactData", async () => {
        try {
            const response = await axios.post('https://seb-vs-virus-api.herokuapp.com/group', {
                uid: uid,
            });
            console.log(response)
            return response ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
        } catch (error) {
            return BackgroundFetch.Result.Failed;
        }
    });
}