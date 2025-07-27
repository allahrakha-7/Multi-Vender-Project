import { useSelector } from "react-redux";
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents = [], isLoading } = useSelector((state) => state.events);

  return (
    <section className="w-full  bg-indigo-50/30 py-10">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[27px] md:text-[32px] font-[700] font-Roboto relative">
            Popular Events
            <span className="absolute -bottom-2 left-0 h-[3px] w-10 rounded-full bg-yellow-500/80" />
          </h2>
          {!isLoading && allEvents?.length > 0 && (
            <span className="hidden md:inline-block text-sm px-3 py-1 rounded-full bg-indigo-100 text-amber-400 font-medium">
              {allEvents.length}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        ) : allEvents.length === 0 ? (
          <p className="text-gray-500 text-center md:text-left">No events yet!</p>
        ) : (
          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-indigo-200">
            {allEvents.map((ev, idx) => (
              <div
                key={ev._id || idx}
                className="min-w-[280px] md:min-w-[320px] lg:min-w-[360px] bg-white rounded-xl shadow-sm hover:shadow-lg border border-transparent hover:border-indigo-100 transition-all duration-200"
              >
                <EventCard data={ev} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;

const EventSkeleton = () => (
  <div className="min-w-[280px] md:min-w-[320px] lg:min-w-[360px] bg-white rounded-xl p-4 shadow-sm animate-pulse">
    <div className="w-full h-40 bg-gray-200 rounded-md mb-4" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
    <div className="h-8 bg-gray-200 rounded w-24" />
  </div>
);
