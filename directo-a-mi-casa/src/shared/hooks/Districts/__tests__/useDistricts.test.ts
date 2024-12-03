import { renderHook } from "@testing-library/react";
import { useDistricts } from "../useDistricts";

describe.skip("useDistricts Hook", () => {
    it("should return the correct list of districts", () => {
        const { result } = renderHook(() => useDistricts());

        const expectedDistricts = [
            { id: 1, name: 'San Isidro' },
            { id: 2, name: 'Miraflores' },
            { id: 3, name: 'Surco' },
            { id: 4, name: 'La Molina' },
        ];

        expect(result.current.districts).toEqual(expectedDistricts);
    });

    it("should return an array of districts with the correct structure", () => {
        const { result } = renderHook(() => useDistricts());

        expect(result.current.districts).toBeInstanceOf(Array);
        result.current.districts.forEach(district => {
            expect(district).toHaveProperty("id");
            expect(district).toHaveProperty("name");
            expect(typeof district.id).toBe("number");
            expect(typeof district.name).toBe("string");
        });
    });
});
