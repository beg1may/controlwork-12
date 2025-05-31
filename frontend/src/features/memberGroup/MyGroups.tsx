import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectMyGroup} from "./memberGroupSlice.ts";
import {useEffect} from "react";
import {fetchMyGroups} from "./memberGroupThunks.ts";

const MyGroups = () => {
    const dispatch = useAppDispatch();
    const groups = useAppSelector(selectMyGroup);

    useEffect(() => {
        dispatch(fetchMyGroups());
    }, [dispatch]);


    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Мои группы</h2>
            <ul className="space-y-2">
                {groups.map(group => (
                    <li key={group._id} className="p-4 bg-white rounded shadow">
                        {group.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyGroups;