export type TabsProps = {
    activeTab: number;
    tabs: {
        id: string;
        data: {
            title: string;
        };
    }[];
    onChange: Function;
};
