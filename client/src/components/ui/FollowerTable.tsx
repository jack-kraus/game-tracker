import Modal from "./Modal";
import PageScroller from "./PageScroller";
import { abbreviateNumber } from "js-abbreviation-number";

export default function FollowerTable({id, username, followers, following}) {
    return <table className="table-fixed border-spacing-2 text-scale-0 w-3/4">
        <thead>
            <tr>
                <th>Followers</th>
                <th>Following</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>
                    <Modal open_element={abbreviateNumber(followers, 1)} button_styling="hover:bg-scale-500 active:bg-scale-100 rounded-full px-3 py-1.5">
                        <PageScroller title={`${username}'s followers`} type="user"
                            route="/api/user"
                            options={{
                                followers: id
                            }}
                            keyStart={`followers_${id}`}
                        />
                    </Modal>
                </th>
                <th>
                    <Modal open_element={abbreviateNumber(following, 1)} button_styling="hover:bg-scale-500 active:bg-scale-100 rounded-full px-3 py-1.5">
                        <PageScroller title={`${username}'s following`} type="user"
                            route="/api/user"
                            options={{
                                following: id
                            }}
                            keyStart={`following_${id}`}
                        />
                    </Modal>
                </th>
            </tr>
        </tbody>
    </table>;
}